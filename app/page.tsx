import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <div className="">
      <div className="border-b border-gray-70 w-full fixed top-0  bg-white">
        <h1 className="mx-4 text-4xl  pt-5 pb-3 w-full ">Malayalam calendar</h1>
        <div className="px-4 grid grid-cols-7 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="py-2 text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>

      <Calendar />
    </div>
  );
}
