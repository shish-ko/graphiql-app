import { ResponsiveStyleValue, Stack } from '@mui/system';
import './Template.scss';
import { generateText, Text } from '~utils/generateParagraphs';
import { StackDirection } from '~interfaces/interfaces';

interface TemplateProps {
  text: Text;
  imgUrl: string;
  direction: ResponsiveStyleValue<
    StackDirection.column | StackDirection.reverse | StackDirection.row
  >;
}

export const Template: React.FC<TemplateProps> = (props: TemplateProps) => {
  const text = generateText(props.text);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction={props.direction}
      useFlexGap
      alignItems="center"
      justifyContent="center"
    >
      <div className="text">{text}</div>
      <div>
        <img className="image" src={props.imgUrl} alt="image" />
      </div>
    </Stack>
  );
};
