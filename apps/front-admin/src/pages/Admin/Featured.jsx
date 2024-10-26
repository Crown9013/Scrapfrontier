/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useFeatured } from "../../hooks/useFeatured";

import DetailedFeatureModal from "../../components/List/DetailedFeatureModal";
import CustomizedFeature 	from "../../components/List/CustomizedFeature";

const Featured = () => {
  const { getAllFeatures, total } = useFeatured();

  const [feturedItems, setFeturedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [limit, setLimit] = useState(5);

  const refresh = async () => {
    const res = await getAllFeatures(limit);
    setFeturedItems(res);
  };

  const showMore = async () => {
    setLimit((prev) => prev + 5);
  };

  useEffect(() => {
    document.title = "Admin | Featured";
  }, []);

  useEffect(() => {
    refresh();
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
              <h1 className="text-center text120">Featured</h1>
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
          {feturedItems?.map((item, index) => (
            <CustomizedFeature
              data={item}
              key={index}
              refresh={refresh}
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
          <DetailedFeatureModal
            row={null}
            refresh={refresh}
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
          ></DetailedFeatureModal>
        )}
      </div>
    </div>
  );
};

export default Featured;
