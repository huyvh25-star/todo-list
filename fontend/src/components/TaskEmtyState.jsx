import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmtyState = ({ filter }) => {
  return (
    <div>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className="space-y-3 ">
          <Circle className="size-12 mx-auto  text-foreground" />
          <div>
            <h3 className="font-medium text-foreground">
              {filter === "active"
                ? "không có nhiệm vụ nào đang làm"
                : filter === "completed"
                ? "không có nhiệm vụ nào hoàn thành"
                : "chưa có nhiệm vụ !"}
            </h3>
            <p className="text-sm text-muted-foreground ">
              {filter === "all"
                ? "thêm nhiệm vụ đầu tiên vào để bắt đầu"
                : `chuyển sang "tất cả" để thấy những nhiệm vụ ${
                    filter === "active" ? "đã hoàn thành" : "đang làm."
                  }`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskEmtyState;
