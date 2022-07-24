import classNames from "../classNames";

function CheckboxItem({ category, changeHandler, value }) {
  // Defines the wording for the checkboxes
  const checkboxItems = {
    necessary: {
      title: "Necessary",
      id: "necessaryCookies",
    },
    statistics: { title: "Statistics", id: "statisticCookies" },
    marketing: { title: "Marketing", id: "marketingCookies" },
    externalMedia: { title: "External media", id: "externalMediaCookies" },
  };
  return (
    <div className="relative flex items-center">
      <div className="flex h-7 items-center sm:h-5">
        <input
          id={checkboxItems[category].id}
          name={checkboxItems[category].id}
          disabled={!changeHandler || false}
          checked={value}
          onChange={() => {
            if (changeHandler) changeHandler(!value);
          }}
          type="checkbox"
          className={classNames(
            "h-6 w-6 rounded border-gray-300 focus:outline-none focus:ring-0 sm:h-4 sm:w-4",
            !value ? "text-gray-400" : "text-lightning-600"
          )}
        />
      </div>
      <div className="ml-3">
        <label
          htmlFor={checkboxItems[category].id}
          className="font-medium text-gray-700"
        >
          {checkboxItems[category].title}
        </label>
      </div>
    </div>
  );
}

export default CheckboxItem;
