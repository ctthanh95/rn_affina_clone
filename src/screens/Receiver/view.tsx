import React, {useState} from 'react';
import Edit from './components/Edit';
import Create from './components/Create';

type Props = {
  isOnePerson: boolean;
  dataBuyer: any;
  dataReceiver: any;
  onDataReReceicer: (data: any) => void;
  onDataBuyer: (data: any) => void;
  onPayment: () => void;
  onSwitch: () => void;
};

const View = ({
  isOnePerson,
  dataBuyer,
  dataReceiver,
  onDataReReceicer,
  onDataBuyer,
  onPayment,
  onSwitch,
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
          dataBuyer={dataBuyer}
          dataReceiver={dataReceiver}
          onDataReReceicer={onDataReReceicer}
          onReplaceView={handleReplaceView}
          isOnePerson={isOnePerson}
          onSwitch={onSwitch}
          onPayment={onPayment}
        />
      )}
    </>
  );
};

export default View;
