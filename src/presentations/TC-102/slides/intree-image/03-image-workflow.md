### In-tree Image Workflow

Images defined at gecko/testing/docker/

<div class="fragment">
    Previously:<br>
    <ul>
        <li>edit image context</li>
        <li>bump verison</li>
        <li>build</li>
        <li>tag</li>
        <li>push image to registry</li>
        <li>commit changes and push to vcs</li>
    </ul>
</div>

<div class="fragment">
    <hr>
    On-push image building:<br>
    <ul>
        <li>edit image context</li>
        <li>commit changes and push to vcs</li>
        <li>Decision task triggers image building task</li>
    </ul>
</div>
