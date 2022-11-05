import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Fragment, useEffect } from 'react';
import { useUpdateUsername } from '../../hooks/useApiUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import useStore from '../../hooks/useStore';
import toast from 'react-hot-toast';

type Inputs = {
  username: string;
};

const schema = yup.object({
  username: yup.string().required().min(3),
});

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsernameModal = ({ isOpen, setIsOpen }: Props) => {
  const { user, updateUsername } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { mutate, data } = useUpdateUsername();
  const onSubmit: SubmitHandler<Inputs> = (input) => {
    const data = {
      userId: user?.id ?? '',
      newUsername: input.username,
    };

    mutate(data);
  };
  useEffect(() => {
    if (data) {
      updateUsername(data.data.username);
      setIsOpen(false);
      toast.success('Username Updated Successfully');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-black"
                >
                  Update Username
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    defaultValue={user?.username}
                    {...register('username')}
                    className="input input-bordered input-md w-full bg-transparent mt-6"
                  />
                  {errors.username && (
                    <span className="text-red-600 block mt-2">
                      Please enter username that is more then 2 characters
                    </span>
                  )}
                  <button type="submit" className="btn mt-4">
                    Update
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UsernameModal;
