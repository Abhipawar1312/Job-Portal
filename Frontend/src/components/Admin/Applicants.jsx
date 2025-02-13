import React, { useContext, useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "../redux/applicationSlice";
import { LoadingBarContext } from "../LoadingBarContext";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const loadingBarRef = useContext(LoadingBarContext);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      } finally {
        loadingBarRef.current.complete();
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch, loadingBarRef]);

  return (
    <div className="px-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="my-5 text-xl font-bold">
          Applicants ({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
