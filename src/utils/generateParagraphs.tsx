export type Text = {
  [key: string]: string;
};

export const generateText = (textObject: Text) => {
  const text = Object.values(textObject).map((paragraph, indx) => (
    <>
      <p key={indx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
      <br />
    </>
  ));

  return text;
};
