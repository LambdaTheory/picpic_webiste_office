import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  children: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center cursor-pointer;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-bold text-2xl py-4 px-6;
          }

          .btn-primary {
            @apply text-white shadow-lg;
            background: linear-gradient(
              135deg,
              #ffd700 0%,
              #ffb347 50%,
              #ff8c00 100%
            );
            border: 1px solid rgba(255, 215, 0, 0.3);
            box-shadow:
              0 4px 15px rgba(255, 215, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .btn-primary:hover {
            @apply transform scale-105 transition-all duration-300;
            background: linear-gradient(
              135deg,
              #ffed4e 0%,
              #ffc947 50%,
              #ff9500 100%
            );
            box-shadow:
              0 8px 25px rgba(255, 215, 0, 0.4),
              0 0 20px rgba(255, 215, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 215, 0, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export { Button };
