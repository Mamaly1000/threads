import React from "react";
import ActivityCard from "../cards/ActivityCard";

const ActivitiesList = ({ activities }: { activities: any[] }) => {
  return (
    <section className="mt-10 flex flex-col gap-5">
      {activities.length > 0 ? (
        <>
          {activities.map((activity) => {
            return <ActivityCard activity={activity} key={activity._id} />;
          })}
        </>
      ) : (
        <p className="!text-base-regular text-light-3">No Activity yet</p>
      )}
    </section>
  );
};

export default ActivitiesList;
