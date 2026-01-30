export function downloadTxt(text: string, filename = "text.txt") {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export function importTxtFile(
  e: React.ChangeEvent<HTMLInputElement>,
  onLoad: (text: string) => void,
) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.name.endsWith(".txt")) {
    alert("Only .txt files allowed");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result as string;
    onLoad(text);
  };

  reader.readAsText(file, "utf-8");

  e.target.value = "";
}
