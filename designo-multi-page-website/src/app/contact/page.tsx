import { Locations } from "~/app/_components/locations";

export default function ContactPage() {
  return (
    <div className="pb-32 desktop:pb-40">
      <div className="center tablet:px-gutter px-0">
        <div className="bg-peach py-20 text-white tablet:rounded desktop:py-14">
          <div className="center-inner grid desktop:grid-cols-[445fr_95fr_380fr]">
            <div className="grid text-center tablet:text-start desktop:grid-rows-[80fr_auto_107fr]">
              <div className="desktop:row-start-2">
                <h1 className="text-h1">Contact Us</h1>
                <p className="mt-6 tablet:mt-8">
                  Ready to take it to the next level? Let’s talk about your
                  project or idea and find out how we can help your business
                  grow. If you are looking for unique digital experiences that’s
                  relatable to your users, drop us a line.
                </p>
              </div>
            </div>
            <form className="mt-12 tablet:mt-10 desktop:col-start-3 desktop:mt-0">
              <div className="grid gap-6">
                <label className="relative">
                  <span className="sr-only">Name</span>
                  <input
                    className="rounded-none peer block w-full border-b-[0.0625rem] bg-transparent px-3 pb-3 placeholder:text-white/50 tablet:px-6 desktop:px-4"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
                </label>
                <label className="relative">
                  <span className="sr-only">Email Address</span>
                  <input
                    className="rounded-none peer block w-full border-b-[0.0625rem] bg-transparent px-3 pb-3 placeholder:text-white/50 tablet:px-6 desktop:px-4"
                    type="email"
                    name="email-address"
                    placeholder="Email Address"
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
                </label>
                <label className="relative">
                  <span className="sr-only">Phone</span>
                  <input
                    className="rounded-none peer block w-full border-b-[0.0625rem] bg-transparent px-3 pb-3 placeholder:text-white/50 tablet:px-6 desktop:px-4"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
                </label>
                <label className="relative">
                  <span className="sr-only">Your Message</span>
                  <textarea
                    className="rounded-none peer block w-full border-b-[0.0625rem] bg-transparent px-3 pb-3 placeholder:text-white/50 tablet:px-6 desktop:px-4"
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                  />
                  <div className="absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
                </label>
              </div>
              <p className="mt-10 grid justify-center tablet:mt-6 tablet:justify-end">
                <button className="button" type="submit">
                  Submit
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Locations />
    </div>
  );
}
