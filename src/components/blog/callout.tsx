import { FaExclamationTriangle, FaRegStickyNote, FaInfoCircle } from 'react-icons/fa';

export default function Callout({ block, renderedText }: { block: any; renderedText: any }) {
  const type = getCalloutType(block);

  return (
    <aside
      className='border-spacing-2 relative mt-8 border-separate rounded-xl border-2 p-4'
      style={{ borderColor: type.color }} // can't use string interpolation with tailwind
    >
      <div className='bg-beige absolute -top-6 left-8'>
        <div className='flex items-center gap-2 py-1.5 px-2' style={{ color: type.color }}>
          {type.icon}
          <span className='font-medium'>{type.text}</span>
        </div>
      </div>
      <div className={`rounded-xl p-4 px-6 text-white`} style={{ backgroundColor: type.color }}>
        {renderedText}
      </div>
    </aside>
  );
}

function getCalloutType(block: any) {
  const { emoji } = block.callout.icon;
  const fontSize = '1.15rem';

  switch (emoji) {
    case '⚠️':
      return {
        icon: <FaExclamationTriangle fontSize={fontSize} />,
        text: 'Warning',
        color: '#f87171', // red-400
      };
    case '💡':
      return {
        icon: <FaInfoCircle fontSize={fontSize} />,
        text: 'Tip',
        color: '#34d399', // emerald-400
      };
    default:
      return {
        icon: <FaRegStickyNote fontSize={fontSize} />,
        text: 'Note',
        color: '#0ea5e9', // sky-500
      };
  }
}
