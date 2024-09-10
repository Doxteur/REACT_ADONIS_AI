import { Badge } from '@/components/ui/badge';
import TableComponent from '@/components/shared/Table';
import { Order } from '@/components/services/types/orders';

interface OrdersTableProps {
  orderData: Order[];
  onEditOrder: (order: Order) => void;
}

export const OrdersTable = ({ orderData, onEditOrder }: OrdersTableProps) => {
  return (
    <TableComponent
      data={orderData}
      columns={[
        {
          header: 'Client',
          accessor: 'customer_name',
          cell: (order) => (
            <>
              <div className='font-medium'>{order.customer_name}</div>
              <div className='hidden text-sm text-muted-foreground md:inline'>
                {order.customer_email}
              </div>
            </>
          ),
          sortable: true,
        },
        {
          header: 'Type',
          accessor: 'type',
          className: 'hidden sm:table-cell',
          sortable: true,
        },
        {
          header: 'Statut',
          accessor: 'status',
          className: 'hidden sm:table-cell',
          cell: (order) => (
            <Badge
              className='text-xs'
              variant={order.status === 'Livré' ? 'secondary' : 'outline'}
              style={{
                backgroundColor:
                  order.status === 'Livré'
                    ? '#4CAF50'
                    : order.status === 'En cours'
                    ? '#FF9800'
                    : order.status === 'En attente'
                    ? '#FFEB3B'
                    : order.status === 'Annulé'
                    ? '#FF0000'
                    : '#CCCCCC',
                color: order.status === 'Livré' ? 'white' : 'black',
              }}
            >
              {order.status}
            </Badge>
          ),
          sortable: true,
        },
        {
          header: 'Date',
          accessor: 'date',
          className: 'hidden md:table-cell',
          sortable: true,
        },
        {
          header: 'Montant',
          accessor: 'amount',
          className: 'text-right',
          cell: (order) => `$${typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}`,
          sortable: true,
        },
      ]}
      onRowClick={(order) => onEditOrder(order)}
      itemsPerPage={5}
    />
  );
};
