
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRoomTypes, useRoomType } from "@/hooks/useRoomTypes";

type RoomTypeFormData = {
  name: string;
  description: string;
  baseRate: number;
  maxAdults: number;
  maxChildren: number;
  amenities: string[];
  active: boolean;
}

export default function RoomTypeForm({ roomTypeId }: { roomTypeId?: string }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentId = roomTypeId || id;
  const isEditMode = !!currentId;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { roomType, isLoading, error } = isEditMode ? useRoomType(currentId) : { roomType: null, isLoading: false, error: null };
  
  const [formData, setFormData] = useState<RoomTypeFormData>({
    name: '',
    description: '',
    baseRate: 0,
    maxAdults: 2,
    maxChildren: 2,
    amenities: [],
    active: true
  });

  const [amenityInput, setAmenityInput] = useState('');

  useEffect(() => {
    if (roomType) {
      setFormData({
        name: roomType.name || '',
        description: roomType.description || '',
        baseRate: roomType.base_rate || 0,
        maxAdults: roomType.max_adults || 2,
        maxChildren: roomType.max_children || 2,
        amenities: Array.isArray(roomType.amenities) ? roomType.amenities : [],
        active: roomType.active ?? true
      });
    }
  }, [roomType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'baseRate' || name === 'maxAdults' || name === 'maxChildren' 
        ? Number(value) 
        : value 
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
  };

  const handleAmenityAdd = () => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()]
      }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would call an API to create or update the room type
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate API call
      
      toast({
        title: isEditMode ? "Room Type Updated" : "Room Type Created",
        description: `Successfully ${isEditMode ? 'updated' : 'created'} ${formData.name}`,
      });
      
      navigate('/settings');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} room type`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading room type data...</div>;
  }

  if (error && isEditMode) {
    return <div className="text-destructive p-4">Error loading room type: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Room Type Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="active">Active</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={Boolean(formData.active)}
                  onCheckedChange={handleSwitchChange}
                />
                <span>{formData.active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="baseRate">Base Rate (per night)</Label>
              <Input
                id="baseRate"
                name="baseRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.baseRate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxAdults">Maximum Adults</Label>
              <Input
                id="maxAdults"
                name="maxAdults"
                type="number"
                min="1"
                value={formData.maxAdults}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxChildren">Maximum Children</Label>
              <Input
                id="maxChildren"
                name="maxChildren"
                type="number"
                min="0"
                value={formData.maxChildren}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Amenities</Label>
              <div className="flex space-x-2">
                <Input
                  value={amenityInput}
                  onChange={e => setAmenityInput(e.target.value)}
                  placeholder="Add an amenity..."
                />
                <Button 
                  type="button" 
                  onClick={handleAmenityAdd} 
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center bg-muted px-2 py-1 rounded">
                    <span>{amenity}</span>
                    <button
                      type="button"
                      className="ml-2 text-muted-foreground hover:text-destructive"
                      onClick={() => removeAmenity(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/settings')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Room Type' : 'Create Room Type'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
