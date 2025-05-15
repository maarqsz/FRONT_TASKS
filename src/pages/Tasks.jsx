import { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTaskStatus } from '../services/api';
import '../styles/Tasks.css';

const statusOptions = [
  { label: 'PENDING', colorClass: 'pending' },
  { label: 'IN_PROGRESS', colorClass: 'in_progress' },
  { label: 'COMPLETED', colorClass: 'completed' },
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [openStatusMenuId, setOpenStatusMenuId] = useState(null); // ID da task com menu aberto

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!newTaskTitle) return;
    try {
      await createTask({ description: newTaskTitle });
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa', error);
    }
  };

  // Atualiza status ao selecionar no menu
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setOpenStatusMenuId(null); // Fecha o menu

      // Atualiza o estado localmente sem recarregar da API
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Erro ao mudar status da tarefa:', error);
    }
  };


  // Abre ou fecha o menu de status ao clicar na bolinha
  const toggleStatusMenu = (taskId) => {
    if (openStatusMenuId === taskId) {
      setOpenStatusMenuId(null);
    } else {
      setOpenStatusMenuId(taskId);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Minhas Tarefas</h2>

      <div className="tasks-form">
        <input
          className="tasks-input"
          type="text"
          placeholder="Nova tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="tasks-button" onClick={handleCreateTask}>Criar</button>
      </div>

      <div className="tasks-legend">
        {statusOptions.map(({ label, colorClass }) => (
          <span key={label}>
            <span className={`status-indicator ${colorClass}`}></span> {label}
          </span>
        ))}
      </div>

      <ul className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li className="tasks-item" key={task.id}>
              <div className="task-left">
                {/* Bolinha que abre o menu */}
                <span
                  className={`status-indicator ${task.status.toLowerCase()}`}
                  onClick={() => toggleStatusMenu(task.id)}
                  title="Clique para mudar status"
                  style={{ cursor: 'pointer', position: 'relative' }}
                ></span>

                <span>{task.description}</span>

                {/* Menu de seleção aparece quando openStatusMenuId bate */}
                {openStatusMenuId === task.id && (
                  <div className="status-menu">
                    {statusOptions.map(({ label, colorClass }) => (
                      <div
                        key={label}
                        className={`status-menu-item ${colorClass}`}
                        onClick={() => handleStatusChange(task.id, label)}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="delete-button" onClick={() => handleDelete(task.id)}>🗑️</button>
            </li>
          ))
        ) : (
          <p className="tasks-empty">Nenhuma tarefa encontrada.</p>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
