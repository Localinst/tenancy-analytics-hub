
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { properties, Property } from "@/lib/data";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const propertyFormSchema = z.object({
  name: z.string().min(1, "Property name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  type: z.string().min(1, "Property type is required"),
  units: z.coerce.number().positive("Units must be a positive number"),
  value: z.coerce.number().positive("Property value must be a positive number"),
  image: z.string().url("Please enter a valid image URL"),
  description: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface AddPropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  isEditing?: boolean;
}

export function AddPropertyForm({ 
  open, 
  onOpenChange,
  property,
  isEditing = false
}: AddPropertyFormProps) {
  const navigate = useNavigate();
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      type: "",
      units: 1,
      value: 0,
      image: "",
      description: "",
    },
  });

  // Set form values when editing an existing property
  useEffect(() => {
    if (isEditing && property) {
      form.reset({
        name: property.name,
        address: property.address,
        city: property.city,
        type: property.type,
        units: property.units,
        value: property.value,
        image: property.image,
        description: property.description || "",
      });
    }
  }, [form, isEditing, property]);

  const onSubmit = (data: PropertyFormValues) => {
    if (isEditing && property) {
      // Update existing property
      console.log("Updated property:", { ...property, ...data });
      
      toast.success("Property updated successfully", {
        description: `${data.name} has been updated.`,
      });
    } else {
      // Add new property
      const newProperty = {
        id: `p${properties.length + 1}`,
        ...data,
        addedDate: new Date().toISOString(),
      };

      console.log("New property:", newProperty);
      
      toast.success("Property added successfully", {
        description: `${data.name} has been added to your properties.`,
      });
    }
    
    form.reset();
    onOpenChange(false);
    navigate("/properties");
  };

  const propertyTypes = ["Apartment Complex", "Single Family", "Commercial", "Multi-Family", "Condo"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {isEditing ? "Edit Property" : "Add New Property"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the details of your property." 
              : "Fill in the details to add a new property to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Marina Towers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 123 Marina Blvd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Units</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="e.g. 24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Value ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="e.g. 2500000" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the property..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Add"} Property</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
