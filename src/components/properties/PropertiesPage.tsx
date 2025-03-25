
import { useState } from "react";
import { Plus, Search, Building2, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden hover-scale">
      <div className="relative h-48 w-full">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{property.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="mt-1">{property.address}, {property.city}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium">{property.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Units</p>
            <p className="font-medium">{property.units}</p>
          </div>
          <div className="col-span-2 mt-2">
            <p className="text-muted-foreground">Valuation</p>
            <p className="font-medium">${property.value.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Properties"
          description="Manage your rental properties"
        />
        <Button className="flex items-center gap-2">
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
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </CardContainer>
      ) : (
        <Grid cols={3}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Grid>
      )}
    </AppLayout>
  );
}
