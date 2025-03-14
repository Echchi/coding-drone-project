import React, { useEffect } from "react";
import { useInstructorSocket } from "../../../features/instructor/hooks/useInstructorSocket";
import { useLecture } from "../../../shared/context/lectureProvider";
import { useStudentList } from "../../../features/instructor/hooks/useStudentList";
import { useScreenPagination } from "../../../features/instructor/hooks/useScreenPagination";
import { StudentGrid } from "../../../features/instructor/ui/StudentGrid";
import { Pagination } from "../../../features/instructor/ui/Pagination";

const ScreenGrid = ({ division }: { division: string }) => {
  const { studentList, socket } = useInstructorSocket();
  const { savedLecture } = useLecture();
  const { students } = useStudentList();

  const { currentPage, totalPages, currentPageStudents, handlePrevPage, handleNextPage } = useScreenPagination({
    studentList,
    division,
  });

  useEffect(() => {
    if (!socket?.connected) {
      console.log("Socket not connected");
      return;
    }
  }, [socket]);

  return (
    <div className="w-full h-[calc(100vh-250px) flex flex-col space-y-4">
      <StudentGrid division={division} students={currentPageStudents} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default ScreenGrid;
