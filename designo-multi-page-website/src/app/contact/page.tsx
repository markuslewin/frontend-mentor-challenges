import { Locations } from "~/app/_components/locations";
import { ContactForm } from "~/app/_components/contact-form";
import { Footer } from "~/app/_components/footer";
import { type Metadata } from "next";
import { Leaf } from "~/app/_components/leaf";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <main>
        <div className="pb-32 desktop:pb-40">
          <div className="center tablet:px-gutter px-0">
            <div className="bg-bg-pattern-hero-contact-mobile tablet:bg-bg-pattern-hero-contact-desktop bg-peach bg-[length:54.75rem] bg-[calc(50%+9.875rem)_top] bg-no-repeat py-20 text-white tablet:rounded tablet:bg-[length:40rem] tablet:bg-[calc(50%-9.1875rem)_-5.1875rem] desktop:bg-[calc(50%-14.875rem)_-10rem] desktop:py-14">
              <div className="center-inner grid desktop:grid-cols-[445fr_95fr_380fr]">
                <div className="grid text-center tablet:text-start desktop:grid-rows-[80fr_auto_107fr]">
                  <div className="desktop:row-start-2">
                    <h1 className="text-h1">Contact Us</h1>
                    <p className="mt-6 tablet:mt-8">
                      Ready to take it to the next level? Let’s talk about your
                      project or idea and find out how we can help your business
                      grow. If you are looking for unique digital experiences
                      that’s relatable to your users, drop us a line.
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
          <Locations />
          <div className="absolute -z-10 hidden w-full -translate-y-72 justify-center overflow-x-hidden desktop:grid">
            <Leaf className="translate-x-[13.6875rem]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
