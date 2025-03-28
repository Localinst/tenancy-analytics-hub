
import { useState } from "react";
import { Property } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, HomeIcon, Hash, DollarSign, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PropertyDetailDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDetailDialog({ 
  property, 
  open, 
  onOpenChange 
}: PropertyDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {property.name}
          </DialogTitle>
          <DialogDescription>
            Property details and information
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Property Image */}
          <div className="relative h-56 w-full mb-4 rounded-md overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-2 right-2">
              {property.type}
            </Badge>
          </div>
          
          {/* Property Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{property.address}, {property.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4 text-muted-foreground" />
                <span>{property.units} Units</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span>ID: {property.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Added {property.addedDate ? formatDistanceToNow(new Date(property.addedDate)) : "recently"} ago</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-medium mb-2">Valuation</h4>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold">${property.value.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">
                {property.description || "No description available for this property."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
