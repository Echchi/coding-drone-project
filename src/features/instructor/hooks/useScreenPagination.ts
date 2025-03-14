import { useState, useEffect } from "react";
import { IStudent } from "../../../shared/types/student";

interface IUseScreenPaginationProps {
  studentList: Record<string, IStudent>;
  division: string;
}

export const useScreenPagination = ({ studentList, division }: IUseScreenPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getStudentsPerPage = () => {
    switch (division) {
      case "4x3":
        return 12;
      case "4x4":
        return 16;
      case "5x4":
        return 20;
      default:
        return 12;
    }
  };

  const studentsPerPage = getStudentsPerPage();
  const totalStudents = Object.values(studentList).length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const getCurrentPageStudents = () => {
    const start = (currentPage - 1) * studentsPerPage;
    const end = start + studentsPerPage;
    return Object.values(studentList).slice(start, end);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [division]);

  return {
    currentPage,
    totalPages,
    currentPageStudents: getCurrentPageStudents(),
    handlePrevPage,
    handleNextPage,
  };
};
