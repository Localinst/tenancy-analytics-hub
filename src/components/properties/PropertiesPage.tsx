
import { useState } from "react";
import { Plus, Search, Building2, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { properties, Property } from "@/lib/data";
import { 
  AppLayout, 
  PageHeader, 
  CardContainer, 
  Grid 
} from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "@/components/ui/action-button";
import { PropertyDetailDialog } from "./PropertyDetailDialog";
import { DeletePropertyDialog } from "./DeletePropertyDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddPropertyForm } from "./AddPropertyForm";

function PropertyCard({ property, onDelete }: { property: Property; onDelete: (id: string) => void }) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { toast } = useToast();

  const handleEdit = () => {
    setShowEditForm(true);
    toast({
      title: "Edit mode",
      description: `You are now editing "${property.name}" property.`,
    });
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleView = () => {
    setShowDetailDialog(true);
  };

  const confirmDelete = () => {
    onDelete(property.id);
  };

  return (
    <>
      <Card className="overflow-hidden hover-scale">
        <div className="relative h-48 w-full">
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
            {property.type}
          </Badge>
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{property.name}</CardTitle>
          </div>
          <CardDescription className="mt-1">{property.address}, {property.city}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Units</p>
              <p className="font-medium">{property.units}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Valuation</p>
              <p className="font-medium">${property.value.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
          <ActionButton 
            icon={Eye} 
            label="View" 
            onClick={handleView} 
            variant="secondary"
            showLabel={false}
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
            aria-label="View property details"
          />
          <ActionButton 
            icon={Edit} 
            label="Edit" 
            onClick={handleEdit} 
            variant="secondary"
            showLabel={false}
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
            aria-label="Edit property"
          />
          <ActionButton 
            icon={Trash2} 
            label="Delete" 
            onClick={handleDelete}
            variant="secondary"
            showLabel={false}
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
            aria-label="Delete property"
          />
        </CardFooter>
      </Card>

      {/* Property Detail Dialog */}
      <PropertyDetailDialog 
        property={property} 
        open={showDetailDialog} 
        onOpenChange={setShowDetailDialog} 
      />

      {/* Delete Confirmation Dialog */}
      <DeletePropertyDialog
        property={property}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={confirmDelete}
      />

      {/* Edit Form Dialog would go here */}
      {showEditForm && (
        <AddPropertyForm 
          open={showEditForm} 
          onOpenChange={setShowEditForm}
          property={property}
          isEditing={true}
        />
      )}
    </>
  );
}

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [localProperties, setLocalProperties] = useState([...properties]);
  
  const filteredProperties = localProperties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProperty = (id: string) => {
    setLocalProperties((prev) => prev.filter((property) => property.id !== id));
  };
  
  return (
    <AppLayout>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Properties"
          description="Manage your rental properties"
        />
        <Button className="flex items-center gap-2" onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </Button>
      </div>
      
      <div className="mb-8 flex gap-4 w-full max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredProperties.length === 0 ? (
        <CardContainer className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No properties found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or add a new property.
            </p>
            <Button className="mt-4" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </CardContainer>
      ) : (
        <Grid cols={3}>
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onDelete={handleDeleteProperty}
            />
          ))}
        </Grid>
      )}
      
      <AddPropertyForm 
        open={showAddForm} 
        onOpenChange={setShowAddForm} 
      />
    </AppLayout>
  );
}
