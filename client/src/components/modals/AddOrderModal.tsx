import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addOrder } from '@/app/reducers/OrdersReducers';
import { AppDispatch } from '@/app/store';
import { Order } from '@/components/services/types/orders';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddOrderModal({ isOpen, onClose }: AddOrderModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [orderData, setOrderData] = useState<Order>({
    customer_name: '',
    customer_email: '',
    type: '',
    amount: 0,
    status: 'pending',
    id: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setOrderData({ ...orderData, [e.target.name]: value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addOrder(orderData));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle commande</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer_name">Nom du client</Label>
              <Input
                id="customer_name"
                name="customer_name"
                value={orderData.customer_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email du client</Label>
              <Input
                id="customer_email"
                name="customer_email"
                type="email"
                value={orderData.customer_email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type de commande</Label>
              <Select onValueChange={handleSelectChange('type')} value={orderData.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Montant</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={orderData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select onValueChange={handleSelectChange('status')} value={orderData.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Livrée">Livrée</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Annulé">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={orderData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Ajouter la commande</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddOrderModal;
