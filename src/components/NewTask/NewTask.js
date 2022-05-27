import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useApi from '../../hooks/use-api';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTaskRequest } = useApi();

  const createTask = (taskText, taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: 'https://react-http-6b4a6.firebaseio.com/tasks.json',
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body:{ text: taskText }
    }, 
      createTask.bind(null, taskText)  // 이부분 잘 모르겠음
    );
  };

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     'https://react-http-6b4a6.firebaseio.com/tasks.json',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Request failed!');
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || 'Something went wrong!');
    // }
    // setIsLoading(false);


  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
