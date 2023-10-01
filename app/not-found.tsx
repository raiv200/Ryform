import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center mt-20">
      <h2 className="font-bold text-4xl md:text-7xl   text-rose-600">
        404! 
      </h2>
      <h2 className="font-bold text-4xl md:text-7xl   text-rose-600">
        Not Found
      </h2>
      <p className="text-sm md:text-lg text-muted-foreground">
        This form Does not Exist.
      </p>
    </div>
  );
}

export default NotFound;

