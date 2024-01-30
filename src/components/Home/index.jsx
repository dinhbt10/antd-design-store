import React from 'react';
import BackgroundImageContact from '../../assets/banner-stnc-5-1400x424-min.png';
import { Controller, useForm } from 'react-hook-form';

const Homepage = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div className="grid bg-[#fffff]">
            <div
                className="flex justify-start items-center h-[70vh] px-[10%] text-[45px] font-bold text-white uppercase"
                style={{
                    background: `url(${BackgroundImageContact})`,
                    backgroundSize: '100% 100%'
                }}
            >
                Liên hệ
            </div>
            <div className="py-6 bg-[#fffff]">
                <div className="px-[10%] py-10 leading-[50px]">
                    <h2 className="text-[45px] font-bold text-[#656565] uppercase">
                        <span className="text-[#12428c]">L</span>iên hệ <br />
                        <span className="text-[#12428c]">V</span>ới chúng tôi
                    </h2>
                </div>
                <div className="p-5 grid md:grid-cols-6 gap-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.649933584684!2d105.77630286793315!3d21.030147699753478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134553b2367ca7b%3A0x4aea87d9e3511e84!2sChung%20c%C6%B0%20Dolphin%20Plaza!5e0!3m2!1svi!2s!4v1701192831528!5m2!1svi!2s"
                        className="md:col-span-4 w-full"
                        height="450"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 md:col-span-2">
                        <h2 className="text-[#01398d] font-bold text-3xl text-center">STNC VIỆT NAM</h2>
                        <input
                            name="name"
                            {...register('name', { required: true })}
                            className="w-full h-9 rounded-[20px] p-2"
                            placeholder="Họ và tên"
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: <span className="text-red-500">Email valid</span>
                                }
                            }}
                            render={({ field }) => <input {...field} className="w-full h-9 rounded-[20px] p-2" placeholder="Email" />}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                        <textarea
                            name="desc"
                            type="text"
                            placeholder="Mô tả"
                            className="w-full h-[100px] rounded-[20px] p-2"
                            {...register('desc', {
                                required: true
                            })}
                        />
                        {errors.desc && <span className="text-red-500">This field is required</span>}
                        <div className="flex w-full items-center justify-center flex-col gap-4">
                            <button type="submit" className="text-white bg-[#01398d] w-[100px] h-8 rounded-md">
                                Gửi
                            </button>
                            <h4 className="text-[#0a0a0a] font-bold text-2xl">Hoặc</h4>
                            <button className="text-white bg-[#01398d] w-[140px] h-8 rounded-md">Liên hệ trực tiếp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
