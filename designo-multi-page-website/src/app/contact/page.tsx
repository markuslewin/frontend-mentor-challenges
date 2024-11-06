import { Locations } from "~/app/_components/locations";
import { ContactForm } from "~/app/_components/contact-form";
import { Footer } from "~/app/_components/footer";

export default function ContactPage() {
  return (
    <>
      <main>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
