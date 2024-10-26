/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useTournamentAndEvents } from "../../hooks/useTournamentAndEvents";

import DetailedTournamentModal 	from "../../components/List/DetailedTournamentModal";
import CustomizedTournament 	from "../../components/List/CustomizedTournament";

const TournamentAndEvent = () => {
  const { getAllTournamentAndEvents, total } = useTournamentAndEvents();

  const [tournamentAndEventsItems, setTournamentAndEventsItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);

  const [limit, setLimit] = useState(5);

  const refreshData = async () => {
    const res = await getAllTournamentAndEvents(limit);
    setTournamentAndEventsItems(res);
  };

  const showMore = async () => {
    setLimit((prev) => prev + 5);
  };

  useEffect(() => {
    document.title = "Admin | Tournament&Events";
  }, []);

  useEffect(() => {
    refreshData();
  }, [limit]);

  useEffect(() => {
    if (total > limit) {
      setIsShowMore(true);
    } else {
      setIsShowMore(false);
    }
  }, [total, limit]);

  return (
    <div>
      <main className="content">
        <div className="main admin-main">
          <div className="main_container">
            <div className="main__content">
              <h1 className="text-center text120">Tournament And Events</h1>
            </div>
          </div>
        </div>
      </main>
      <div className="main_container">
        <div>
          <button
            className="block bg-[#CC402A] ml-auto uppercase p-2 mt-5"
            onClick={() => setOpenModal(true)}
          >
            Add New
          </button>
        </div>
        <div>
          {tournamentAndEventsItems?.map((item, index) => (
            <CustomizedTournament
              data={item}
              key={index}
              refreshData={refreshData}
            />
          ))}
          {isShowMore && (
            <button
              className="flex justify-center items-center bg-[#CC402A] m-auto uppercase p-2 mt-5"
              onClick={() => showMore()}
            >
              Show More
            </button>
          )}
        </div>
        {openModal && (
          <DetailedTournamentModal
            row={null}
            refreshData={refreshData}
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TournamentAndEvent;
