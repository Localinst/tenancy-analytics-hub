
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Receipt, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { properties, tenants, transactions } from "@/lib/data";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const transactionFormSchema = z.object({
  date: z.date({
    required_error: "Transaction date is required",
  }),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  type: z.enum(["income", "expense"], {
    required_error: "Transaction type is required",
  }),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  propertyId: z.string().min(1, "Property is required"),
  tenantId: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export function AddTransactionForm({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
      type: "income",
      category: "",
      description: "",
      propertyId: "",
      tenantId: "",
    },
  });

  const watchType = form.watch("type");
  const watchPropertyId = form.watch("propertyId");
  
  const incomeCategories = ["Rent", "Security Deposit", "Late Fee", "Other Income"];
  const expenseCategories = ["Maintenance", "Utilities", "Insurance", "Property Tax", "Mortgage", "Other Expense"];
  
  const filteredTenants = tenants.filter(
    tenant => tenant.propertyId === watchPropertyId
  );

  const onSubmit = (data: TransactionFormValues) => {
    // In a real app, we would make an API call here
    // For demo purposes, we'll simulate adding to the array
    const newTransaction = {
      id: `tr${transactions.length + 1}`,
      ...data,
    };

    // This is just for demo purposes and would be replaced with an actual API call
    console.log("New transaction:", newTransaction);
    
    toast.success("Transaction added successfully", {
      description: `${data.description} has been added to your transactions.`,
    });
    
    form.reset();
    onOpenChange(false);
    navigate("/transactions");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Add New Transaction
          </DialogTitle>
          <DialogDescription>
            Record a new income or expense transaction.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Transaction Type</div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={watchType === "income" ? "default" : "outline"}
                  className={cn(
                    "flex gap-1 items-center px-3 py-1 h-auto",
                    watchType === "income" && "bg-emerald-600 hover:bg-emerald-700"
                  )}
                  onClick={() => form.setValue("type", "income")}
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  Income
                </Button>
                <Button
                  type="button"
                  variant={watchType === "expense" ? "default" : "outline"}
                  className={cn(
                    "flex gap-1 items-center px-3 py-1 h-auto",
                    watchType === "expense" && "bg-rose-600 hover:bg-rose-700"
                  )}
                  onClick={() => form.setValue("type", "expense")}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                  Expense
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="e.g. 1500.00" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(watchType === "income" ? incomeCategories : expenseCategories).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Monthly rent payment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchType === "income" && (
              <FormField
                control={form.control}
                name="tenantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant (Optional)</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!watchPropertyId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            watchPropertyId 
                              ? "Select tenant" 
                              : "Select a property first"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {filteredTenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id}>
                            {tenant.name} (Unit {tenant.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
