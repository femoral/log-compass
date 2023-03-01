import ContentCopy from "~icons/mdi/content-copy";
export const CopyJson = (props) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(props.fieldValue, null, 2)
    );
  };

  return <ContentCopy onClick={copyToClipboard} />;
};
