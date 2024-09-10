import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { OrdersTable } from '@/components/services/orders/TablesOrders';
import { fetchOrders } from '@/app/reducers/OrdersReducers';
import { AppDispatch, RootState } from '@/app/store'; // Assurez-vous que ce chemin est correct

export const description =
  "Un tableau de bord des commandes avec une navigation latérale. La barre latérale a une navigation par icônes. La zone de contenu a un fil d'Ariane et une recherche dans l'en-tête. La zone principale affiche une liste des commandes récentes avec un filtre et un bouton d'exportation. La zone principale affiche également une vue détaillée d'une seule commande avec les détails de la commande, les informations d'expédition, les informations de facturation, les informations client et les informations de paiement.";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders);
  const [totalAmount, setTotalAmount] = useState(0);
  const [thisWeekAmount, setThisWeekAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const calculateAmounts = () => {
      const total = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
      setTotalAmount(total);

      const weekAmount = orders
        .filter((order) => {
          const orderDate = new Date(order.date);
          const today = new Date();
          const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
          return orderDate >= weekAgo && orderDate <= today;
        })
        .reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
      setThisWeekAmount(weekAmount);
    };

    if (orders.length > 0) {
      calculateAmounts();
    }
  }, [orders]);

  if (isLoading) return <div>Chargement des commandes...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <TooltipProvider>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          {/* Card 1 */}
          <Card className='sm:col-span-2'>
            <CardHeader className='pb-3'>
              <CardTitle>Vos Commandes</CardTitle>
              <CardDescription className='max-w-lg text-balance leading-relaxed'>
                Tableau de bord dynamique des commandes pour une gestion et une analyse perspicace.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Créer une nouvelle commande</Button>
            </CardFooter>
          </Card>

          {/* Card 2 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Cette Semaine</CardDescription>
              <CardTitle className='text-4xl'>{thisWeekAmount.toFixed(2)} €</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>
                {((thisWeekAmount / totalAmount) * 100).toFixed(2)}% du total
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={(thisWeekAmount / totalAmount) * 100}
                aria-label='Pourcentage du total'
              />
            </CardFooter>
          </Card>

          {/* Card 3 */}
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total</CardDescription>
              <CardTitle className='text-4xl'>{totalAmount.toFixed(2)} €</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>
                {orders.length} commandes au total
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={100} aria-label='Total des commandes' />
            </CardFooter>
          </Card>
        </div>

        {/* Card 4 */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Vous avez {orders.length} commandes totales</CardDescription>
          </CardHeader>
          <CardContent>{orders.length > 0 && <OrdersTable orderData={orders} />}</CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
