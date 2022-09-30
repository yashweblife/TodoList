import { useContext, useEffect } from 'react';

import { IonBadge, IonCard, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import './Tab1.css';
import TodoContext, {generateRandomString, TodoContextProvider} from '../store/todo-context';
import TaskContainer from '../components/TaskContainer';
import { addOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [alert] = useIonAlert()
  const todoContext = useContext(TodoContext)
  useEffect(()=>{
    console.log(todoContext?.list)
  },[])
  const addTodo = (data:string)=>{
    todoContext?.add({
      name:data || "Empty",
      id:generateRandomString(10),
      marked:false,
      created:new Date()
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab slot="fixed" vertical='bottom' horizontal='end'>
          <IonFabButton onClick={()=>
            alert({
              header:"Add A Task",
              buttons:[
                {
                  text:"Add",
                  handler:(data:any)=>{addTodo(data[0])}
                },
                {
                  text:"Discard"
                }
              ],
              inputs:[
                {
                  placeholder:"Enter A Value"
                }
              ]
            })
          }>
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonList>
        {
          (todoContext?.list) ? 
          todoContext.list.map((item:any, index:number)=>{
            return(<TaskContainer key={index} deleteData={todoContext.delete} todoData={item}/>)
          }):null
        }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
