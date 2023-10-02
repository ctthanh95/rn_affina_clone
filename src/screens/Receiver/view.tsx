import React, {useState} from 'react';
import Edit from './components/Edit';
import Create from './components/Create';

type Props = {
  cart: any;
  isOnePerson: boolean;
  dataBuyer: any;
  dataReceiver: any;
  onDataReReceicer: (data: any) => void;
  onDataBuyer: (data: any) => void;
  onPayment: () => void;
  onSwitch: () => void;
  onFilterInsurance: () => void;
};

const View = ({
  cart,
  isOnePerson,
  dataBuyer,
  dataReceiver,
  onDataReReceicer,
  onDataBuyer,
  onPayment,
  onSwitch,
  onFilterInsurance,
}: Props) => {
  const [isEditView, setIsEditView] = useState(false);
  const [type, setType] = useState('');

  const handleReplaceView = (type: string) => {
    setIsEditView(previousState => !previousState);
    if (type) setType(type);
  };

  const handleEditData = (data: any) => {
    if (isOnePerson) {
      onDataBuyer(data);
      onDataReReceicer(data);
    } else {
      if (type === 'buyer') {
        onDataBuyer(data);
      } else {
        onDataReReceicer(data);
      }
    }
  };

  return (
    <>
      {isEditView ? (
        <Edit
          type={type}
          data={type === 'buyer' ? dataBuyer : dataReceiver}
          onReplaceView={handleReplaceView}
          onEditData={handleEditData}
          isOnePerson={isOnePerson}
        />
      ) : (
        <Create
          cart={cart}
          dataBuyer={dataBuyer}
          dataReceiver={dataReceiver}
          onDataReReceicer={onDataReReceicer}
          onReplaceView={handleReplaceView}
          isOnePerson={isOnePerson}
          onSwitch={onSwitch}
          onPayment={onPayment}
          onFilterInsurance={onFilterInsurance}
        />
      )}
    </>
  );
};

export default View;
