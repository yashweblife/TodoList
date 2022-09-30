import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import TaskContainer from '../components/TaskContainer';
import TodoContext from '../store/todo-context';
import './Tab2.css';

const Tab2: React.FC = () => {
  const todoContext = useContext(TodoContext)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completed Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
        {
          (todoContext?.marked) ? 
          todoContext.marked.map((item:any, index:number)=>{
            return(<TaskContainer key={index} todoData={item} deleteData={todoContext.deleteMarked}/>)
          }):null
        }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
