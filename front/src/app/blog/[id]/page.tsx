import CommentForm from "@/components/comment-form/comment-form";
import CommentList from "@/components/comment-list/comment-list";
import Likes from "@/components/likes/likes";

export default function Blog() {
  return (
    <div className="max-w-screen-lg my-4">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue mollis nisi vitae interdum. Nullam arcu magna, faucibus at nibh quis, euismod tristique massa. Integer aliquam lectus justo, eu sodales felis porta non. Cras dignissim nibh at felis varius, a maximus tortor sagittis. Maecenas semper viverra eros et sodales. Curabitur condimentum in mi vel consequat. Donec commodo ac felis pharetra congue. Vivamus rutrum ex eget tempor mattis. Fusce tincidunt purus enim, eu hendrerit metus ornare vitae. Donec iaculis finibus fermentum. Donec ornare risus enim, ut venenatis tellus facilisis in.
      </p>
      <p>
        Fusce et laoreet dui, ac vestibulum lacus. Phasellus id libero ac elit malesuada sodales. In rutrum efficitur tellus ut gravida. Nulla dapibus at elit eget rutrum. Vestibulum gravida, diam id rutrum rutrum, nisl tellus tristique purus, nec hendrerit sapien augue vitae risus. Nam nec lorem quis lacus dignissim viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <p>
        Duis et arcu sem. Donec vitae justo vitae felis auctor rhoncus. Vestibulum semper quis augue in scelerisque. Pellentesque aliquet, sem ac accumsan rutrum, nibh erat tempus elit, id aliquet sapien nisi vitae tortor. Integer in iaculis odio, sit amet vestibulum augue. Aliquam erat volutpat. Cras et purus libero. Pellentesque porttitor sollicitudin tellus vel faucibus. Duis lectus tortor, blandit a porttitor et, sagittis bibendum nisi. Etiam non nibh quam. Phasellus in sollicitudin velit. Ut accumsan a justo vel ullamcorper. Maecenas ac nulla id metus finibus feugiat ac non neque. In quis risus eu tortor tempus iaculis.
      </p>

      <p>
        Aenean pretium turpis egestas viverra ullamcorper. Proin feugiat vitae nisl nec pulvinar. Nulla vitae dapibus lorem, pretium ornare diam. Vivamus et sollicitudin ipsum. Sed aliquet ut sem nec imperdiet. Quisque hendrerit gravida felis, at porta nunc mollis vitae. Duis id molestie est, in tristique sem. Praesent et est dui. Curabitur sollicitudin dignissim cursus. Nam ultrices lacinia ante nec sodales. Duis sit amet odio volutpat, posuere dui ac, facilisis turpis. Aliquam felis tortor, vestibulum quis consequat et, varius a risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed tincidunt erat dolor, eget pharetra urna posuere volutpat.
      </p>

      <p>
        Aliquam convallis justo et ex posuere suscipit. Morbi auctor dui consectetur, accumsan massa id, aliquet felis. Aliquam sapien enim, ornare a tristique vitae, suscipit a eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc est tellus, molestie vel congue interdum, rutrum ac ex. Phasellus magna arcu, tincidunt ac cursus vel, commodo vitae mauris. Aenean vel tempor risus. Phasellus fermentum convallis quam, sit amet ultricies lectus imperdiet elementum. Suspendisse laoreet metus vitae massa dignissim, vitae consequat lectus dapibus. Phasellus orci tellus, pretium vitae rutrum vitae, imperdiet vitae arcu. Aenean viverra molestie libero sit amet faucibus. Donec ultrices nibh sit amet hendrerit mattis. Suspendisse quam nibh, tempor ut diam eu, tincidunt tempor neque. Proin eu lobortis lacus. Ut non justo pharetra, imperdiet nisi eget, euismod nisl.
      </p>
      <hr/>
      <Likes />
      <CommentList/>
      <CommentForm/>
    </div>
  )
}
