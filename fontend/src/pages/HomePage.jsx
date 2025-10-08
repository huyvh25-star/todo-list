import AddTask from "@/components/AddTask";
import DateTimeFilters from "@/components/DateTimeFilters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatusAndFilters from "@/components/StatusAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState();
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
      console.log("data : ", res.data);
    } catch (error) {
      console.log("lỗi khi call api : ", error);
      toast.error("lỗi xảy ra khi truy vấn tasks");
    }
  };
  // biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });
  const handleTaskChange = () => {
    fetchTasks();
  };

  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  if (visibleTask.length === 0) {
    handlePrev();
  }
  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Cool Blue Glow Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top center,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />
          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChange} />
          {/* Thống kê và bộ lọc */}
          <StatusAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
          {/* Danh sách  nhiệm vụ */}
          <TaskList
            filtertasks={visibleTask}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />
          {/* phân trang và bộ lọc */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              visibleTask={visibleTask}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilters
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân trang */}
          <Footer
            completedTaskCount={completedTaskCount}
            activetedTaskCount={activeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
