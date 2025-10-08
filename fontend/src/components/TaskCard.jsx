import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChange }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("nhiệm vụ đã xóa.");
      handleTaskChange();
    } catch (error) {
      console.log("lỗi khi call api xóa task : ", error);
      toast.error("lỗi xảy ra khi xóa tasks");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };
  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`nhiệm vũ đã thay đổi thành : ${updateTaskTitle}`);
      handleTaskChange();
    } catch (error) {
      console.log("lỗi khi call api update task : ", error);
      toast.error("lỗi xảy ra khi update tasks");
    }
  };
  const toggleTaskCompletedButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành !`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} đã hoàn thành !`);
      }
      handleTaskChange();
    } catch (error) {
      console.log("lỗi khi call api cập nhật status task : ", error);
      toast.error("lỗi xảy ra khi cập nhật status tasks");
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn xem phần tử đã hoàn thành hay chưa */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80 "
              : "text-muted-foreground  hover:text-primary"
          )}
          onClick={toggleTaskCompletedButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* hiển thị chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="cần phải làm gì"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false), setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          {/* Ngày tạo & ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Calendar className="size-3" />

            {/* Hiển thị ngày tạo */}
            <span className="text-sm">
              {new Date(task.createdAt).toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>

            {/* Nếu đã hoàn thành thì hiển thị thêm ngày hoàn thành */}
            {task.completedAt && (
              <>
                <span className="text-xs">–</span>
                <Calendar className="size-3" />
                <span className="text-xs">
                  {new Date(task.completedAt).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
        {/* chỉnh và xóa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nut edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút xóa */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
