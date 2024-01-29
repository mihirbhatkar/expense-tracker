const score = (monthlyLimit, currentBalance) => {
  const score = currentBalance / monthlyLimit;
  let msg = "";
  let light = "";
  let lighter = "";
  let lightest = "";

  if (score >= 0.5) {
    msg = "Your stackSense is great!";
    light = "bg-emerald-500";
    lighter = "bg-emerald-300";
    lightest = "bg-emerald-100";
  } else if (score < 0.5 && score > 0.1) {
    msg = "Mind your stackSense!";
    light = "bg-amber-500";
    lighter = "bg-amber-300";
    lightest = "bg-amber-100";
  } else if (score <= 0.1) {
    msg = "Your stackSense is terrible!";
    light = "bg-red-500";
    lighter = "bg-red-300";
    lightest = "bg-red-100";
  }

  return {
    stackScore: score,
    msg,
    light,
    lighter,
    lightest,
  };
};
export default score;
