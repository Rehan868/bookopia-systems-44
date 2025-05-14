
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Only POST requests allowed
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Create admin user
    const { data: adminUser, error: adminError } = await supabaseClient.auth.admin.createUser({
      email: "admin@example.com",
      password: "Admin123!",
      email_confirm: true,
      user_metadata: {
        name: "Admin User",
        role: "admin"
      }
    });
    
    if (adminError) {
      console.error("Error creating admin user:", adminError);
    } else {
      console.log("Admin user created:", adminUser);
      
      // Create user_role_assignment for admin
      await supabaseClient.from('user_role_assignments').insert({
        user_id: adminUser.user.id,
        role_id: 'd7f569df-191b-4c77-9563-d602b89e6a25' // Admin role ID
      });
    }
    
    // Create agent user
    const { data: agentUser, error: agentError } = await supabaseClient.auth.admin.createUser({
      email: "agent@example.com",
      password: "Agent123!",
      email_confirm: true,
      user_metadata: {
        name: "Agent User",
        role: "agent"
      }
    });
    
    if (agentError) {
      console.error("Error creating agent user:", agentError);
    } else {
      console.log("Agent user created:", agentUser);
      
      // Create user_role_assignment for agent
      await supabaseClient.from('user_role_assignments').insert({
        user_id: agentUser.user.id,
        role_id: 'f668f40e-def9-4c83-8f07-70fc34a32363' // Agent role ID
      });
    }
    
    // Create owner user (Rehan)
    const { data: ownerUser, error: ownerError } = await supabaseClient.auth.admin.createUser({
      email: "rehan@gmail.com",
      password: "Rehan8688@",
      email_confirm: true,
      user_metadata: {
        name: "Rehan Owner",
        role: "owner"
      }
    });
    
    if (ownerError) {
      console.error("Error creating owner user:", ownerError);
    } else {
      console.log("Owner user created:", ownerUser);
      
      // Create owner profile in owners table
      const { data: ownerProfile, error: ownerProfileError } = await supabaseClient.from('owners').insert({
        user_id: ownerUser.user.id,
        name: "Rehan Owner",
        email: "rehan@gmail.com",
        phone: "+971501234567"
      }).select().single();
      
      if (ownerProfileError) {
        console.error("Error creating owner profile:", ownerProfileError);
      } else {
        console.log("Owner profile created:", ownerProfile);
        
        // Create sample rooms for the owner to manage
        // First, get the sample rooms we need to assign
        const { data: sampleRooms } = await supabaseClient.from('rooms').insert([
          {
            number: "Marina 102",
            property_id: (await supabaseClient.from('properties').select('id').eq('name', 'Marina Towers').single()).data?.id,
            room_type_id: (await supabaseClient.from('room_types').select('id').eq('name', 'One Bedroom Suite').single()).data?.id,
            status: 'available',
            floor: '1',
            max_adults: 2,
            max_children: 1,
            base_rate: 250
          },
          {
            number: "Marina 202",
            property_id: (await supabaseClient.from('properties').select('id').eq('name', 'Marina Towers').single()).data?.id,
            room_type_id: (await supabaseClient.from('room_types').select('id').eq('name', 'One Bedroom Suite').single()).data?.id,
            status: 'available',
            floor: '2',
            max_adults: 2,
            max_children: 1,
            base_rate: 270
          },
          {
            number: "Room 868",
            property_id: (await supabaseClient.from('properties').select('id').eq('name', 'Palm Residences').single()).data?.id,
            room_type_id: (await supabaseClient.from('room_types').select('id').eq('name', 'Two Bedroom Deluxe').single()).data?.id,
            status: 'available',
            floor: '8',
            max_adults: 4,
            max_children: 2,
            base_rate: 350
          }
        ]).select();
        
        if (sampleRooms) {
          // Assign rooms to the owner
          for (const room of sampleRooms) {
            await supabaseClient.from('property_ownership').insert({
              room_id: room.id,
              owner_id: ownerProfile.id,
              contract_start_date: new Date().toISOString().split('T')[0],
              commission_rate: 10
            });
          }
          console.log("Rooms assigned to owner:", sampleRooms.map(r => r.number).join(", "));
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Demo users created: admin@example.com, agent@example.com, rehan@gmail.com" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error("Error creating demo users:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
