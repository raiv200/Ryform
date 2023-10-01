"use client"

import Image from 'next/image'

export default function ThankYou() {
  return (
    <section className="flex mt-28 justify-center  w-full ">
      <article className="flex flex-col items-center mt-4 w-[580px] ml-[10px]">
        <Image
          className="w-[108px] h-[108px] "
          src="/icon-thank-you.svg"
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
        />
        <h1
          className={`font-extrabold text-[40px] mb-[10px] text-orange-600 mt-[24px]`}
        >
          Thank you!
        </h1>
        <p className="font-lg font-medium text text-center text-orange-400">
        Thanks for completing this form! Your detials have been saved.
        </p>
      </article>
    </section>
  )
}