import React, { useEffect, useState } from "react";
import EachUtils from "@/utils/EachUtils";
import TVCard from "../TVCard";
import CarouselLayout from "@/components/Layouts/CarouselLayout";
import { getTVByType } from "@/utils/getTVByType";
import { useAtom } from "jotai";
import { isFetchingAtom } from "@/jotai/atoms";

const TVList = ({ title, tvType }) => {
  const [tvList, setTvList] = useState([]);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (tvType) {
      setIsFetching(true);
      getTVByType({ tvType })
        .then((result) => {
          setTvList(result);
        })
        .finally(() => {
          setTimeout(() => setIsFetching(false), 400);
        });
    }
  }, [tvType]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6 relative">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 select-none">
        <div className="w-1.5 h-6 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
        <h3 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-sans">
          {title}
        </h3>
      </div>

      {/* Carousel */}
      <CarouselLayout>
        <EachUtils
          of={tvList}
          render={(item, index) => (
            <div
              className="w-[135px] sm:w-[150px] md:w-[165px] lg:w-[175px] xl:w-[180px] shrink-0"
              key={item.id || index}
            >
              <TVCard data={item} />
            </div>
          )}
        />
      </CarouselLayout>
    </section>
  );
};

export default TVList;
