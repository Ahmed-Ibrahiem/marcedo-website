// components/UploadProgressBar.jsx
const UploadProgressBar = ({ progress, style }) => {
  return (
    <div className={`w-full flex-center-col gap-5 ${style || ""}`}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray text-center">Uploading ... {progress}%</p>
    </div>
  );
};

export default UploadProgressBar;
