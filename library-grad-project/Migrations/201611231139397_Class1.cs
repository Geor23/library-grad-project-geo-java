namespace LibraryGradProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Class1 : DbMigration
    {
       

        public override void Up()
        {
            DropTable("dbo.BookDbReservations");
            DropTable("dbo.Books");
            
            CreateTable(
                "dbo.BookDbReservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        bookId = c.Int(nullable: false),
                        from = c.DateTime(nullable: false),
                        to = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ISBN = c.String(),
                        Title = c.String(),
                        Author = c.String(),
                        PublishDate = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }

    }
}
