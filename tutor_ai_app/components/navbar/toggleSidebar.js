function ToggleSidebar() {
  return (
    <div className="mr-10">
      <svg
        width={27}
        height={16}
        viewBox="0 0 27 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 2C0 0.895431 0.895431 0 2 0H25C26.1046 0 27 0.895431 27 2V2C27 3.10457 26.1046 4 25 4H2C0.895431 4 0 3.10457 0 2V2Z"
          fill="#404040"
        />
        <rect y={6} width={27} height={4} rx={2} fill="#404040" />
        <path
          d="M0 14C0 12.8954 0.895431 12 2 12H25C26.1046 12 27 12.8954 27 14V14C27 15.1046 26.1046 16 25 16H2C0.895431 16 0 15.1046 0 14V14Z"
          fill="#404040"
        />
      </svg>
    </div>
  );
}

export default ToggleSidebar;
