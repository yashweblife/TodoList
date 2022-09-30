import { IonCard, IonCardHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonCardContent, IonLabel } from "@ionic/react"
import { arrowBackOutline, arrowForwardOutline, trashOutline } from "ionicons/icons"
import { useContext, useEffect, useState } from "react"
import TodoContext, { todolist } from "../store/todo-context"

const TaskContainer:React.FC<{todoData:todolist, deleteData:(todo:todolist)=>void}> = ({todoData, deleteData})=>{
    const todoContext = useContext(TodoContext)
    const deleteTodo = ()=>{
      deleteData(todoData)  
    }
    const mark = ()=>{
      if(todoData.marked){
        todoContext?.unmove(todoData)
      }else{
        todoContext?.move(todoData)
      }
    }
    return(
        <IonCard>
          {
            (!todoData.marked) ?
            <IonCardHeader>
              <IonToolbar>
                <IonTitle slot="start">{todoData.name}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={deleteTodo} color="primary">
                        <IonIcon icon={trashOutline}></IonIcon>
                    </IonButton>
                    <IonButton onClick={mark} color="primary">
                        <IonIcon icon={arrowForwardOutline}></IonIcon>
                    </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonCardHeader>
            :
            <IonCardHeader>
            <IonToolbar>
              <IonButton onClick={mark} slot="start" color="primary" fill="clear">
                  <IonIcon icon={arrowBackOutline}></IonIcon>
              </IonButton>
              <IonTitle slot="start">{todoData.name}</IonTitle>
              <IonButton onClick={deleteTodo} slot="end" fill="clear">
                  <IonIcon icon={trashOutline}></IonIcon>
              </IonButton>
            </IonToolbar>
          </IonCardHeader>
          }
          <IonCardContent>
            <IonLabel>{`${todoData.created.getDate()} / ${todoData.created.getMonth()} / ${todoData.created.getFullYear()}`}</IonLabel>
          </IonCardContent>
      </IonCard>
    )
}

export default TaskContainer