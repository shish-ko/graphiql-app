import { ResponsiveStyleValue, Stack } from '@mui/system';
import './Template.scss';
import { generateText, Text } from '~utils/generateParagraphs';

interface TemplateProps {
  text: Text;
  imgUrl: string;
  direction: ResponsiveStyleValue<'column' | 'row-reverse' | 'row'>;
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
