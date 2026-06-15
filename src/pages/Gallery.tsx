import PageLayout from "@/components/PageLayout";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GallerySlideshow from "@/components/gallery/GallerySlideshow";
import GalleryStyles from "@/components/gallery/GalleryStyles";

export default function Gallery() {
  return (
    <PageLayout>
      <section className="relative px-2 sm:px-3 md:px-4 pt-4 md:pt-8 pb-16">
        <div className="w-full max-w-5xl mx-auto">
          <GalleryHeader />
          <GallerySlideshow />
        </div>
      </section>
      <GalleryStyles />
    </PageLayout>
  );
}
