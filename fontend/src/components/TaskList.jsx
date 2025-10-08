import React from "react";
import TaskEmtyState from "./TaskEmtyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filtertasks, filter, handleTaskChange }) => {
  if (!filtertasks || filtertasks.length === 0) {
    return <TaskEmtyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filtertasks.map((task, index) => (
        <TaskCard
          key={task._id || index}
          task={task}
          index={index}
          handleTaskChange={handleTaskChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
