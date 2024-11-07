export const YouTubeEmbed = ({ url, title = "hello" }: { url: string, title: string }) => {

  const id = url.split("=")[1]
  return (
    <div className={"w-full object-cover aspect-video"}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="object-cover w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
};