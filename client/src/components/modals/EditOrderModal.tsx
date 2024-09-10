import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateOrder } from '@/app/reducers/OrdersReducers';
import { AppDispatch } from '@/app/store';
import { Order } from '@/components/services/types/orders';

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

function EditOrderModal({ isOpen, onClose, order }: EditOrderModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    setOrderData(order);
  }, [order]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!orderData) return;
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setOrderData({ ...orderData, [e.target.name]: value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    if (!orderData) return;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderData) {
      dispatch(updateOrder(orderData));
      onClose();
    }
  };

  if (!orderData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la commande</DialogTitle>
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
            <Button type="submit">Enregistrer les modifications</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrderModal;
